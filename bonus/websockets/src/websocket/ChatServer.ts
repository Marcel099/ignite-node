import { container } from "tsyringe";

import { io } from "../http";
import { User } from "../schemas/User";
import { CreateChatRoomService } from "../services/CreateChatRoomService";
import { CreateMessageService } from "../services/CreateMessageService";
import { CreateUserService } from "../services/CreateUserService";
import { GetAllUsersService } from "../services/GetAllUsersService";
import { GetChatRoomByIdService } from "../services/GetChatRoomByIdService";
import { GetChatRoomByUsersService } from "../services/GetChatRoomByUsersService";
import { GetMessagesByChatRoomService } from "../services/GetMessagesByChatRoomService";
import { GetUserBySocketIdService } from "../services/GetUserBySocketIdService";

io.on("connect", (socket) => {  
  socket.on("start", async (data) => {
    const { email, avatar, name } = data;
    // console.log("start", { email });

    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute({
      email,
      avatar,
      name,
      socket_id: socket.id,
    });

    socket.broadcast.emit("new_users", user);
  });

  socket.on("get_users", async (callback) => {
    const getAllUsersService = container.resolve(GetAllUsersService);    

    const users = await getAllUsersService.execute();

    callback(users);
  });

  socket.on("start_chat", async (data, callback) => {
    const createChatRoomService = container.resolve(
      CreateChatRoomService
    );
    const getUserBySocketIdService = container.resolve(
      GetUserBySocketIdService
    );
    const getChatRoomByUsersService = container.resolve(
      GetChatRoomByUsersService
    );
    const getMessagesByChatRoomService = container.resolve(
      GetMessagesByChatRoomService
    );

    const signedInUser = await getUserBySocketIdService.execute(socket.id);

    // console.log({ signedInUserId: signedInUser?.id })
    const userIds = [ data.idUser, signedInUser?.id ];

    let room = await getChatRoomByUsersService.execute(userIds);

    if (!room) {
      room = await createChatRoomService.execute(userIds);
    }

    socket.join(room.idChatRoom);

    const messages = await getMessagesByChatRoomService.execute(room.id);

    // console.log({ messages })

    callback({ room, messages });
  });

  socket.on("message", async (data) => {
    const getUserBySocketIdService = container.resolve(
      GetUserBySocketIdService
    );
    const createMessageService = container.resolve(
      CreateMessageService
    );
    const getChatRoomByIdService = container.resolve(
      GetChatRoomByIdService
    );

    const signedInUser = await getUserBySocketIdService.execute(socket.id);

    //todo Esse dado do "to" está correto?
    //todo Parece que envia a mensagem para si mesmo
    const message = await createMessageService.execute({
      to: signedInUser._id,
      text: data.message,
      roomId: data.idChatRoom,
    });

    io.to(data.idChatRoom).emit("message", {
      message,
      user: signedInUser,
    });

    const room = await getChatRoomByIdService.execute(
      data.idChatRoom
    );

    const userFrom = room.idUsers.find(
      user => String(user._id) !== String(signedInUser._id)
    );

    io.to(userFrom.socket_id).emit("notification", {
      from: signedInUser,
    })
  });
});
