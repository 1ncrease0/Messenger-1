package main

import (
	"log"
	"net"
	"os"

	"google.golang.org/grpc"
	"grpcChatServer/chatserver"
)

func main() {

	
	Port := os.Getenv("PORT")
	if Port == "" {
		Port = "5000" //default port
		}

	//слушаем поток
	listen, err := net.Listen("tcp", "0.0.0.0:"+Port)
	if err != nil {
		log.Fatalf("ошибка прослушки @ %v :: %v", Port, err)
	}
	log.Println("HOST: " + Port)

	//объявляем сервер gRPC 
	grpcserver := grpc.NewServer()

//регаем
	cs := chatserver.ChatServer{}
	chatserver.RegisterServicesServer(grpcserver,&cs)

	err = grpcserver.Serve(listen)
	if err != nil {
		log.Fatalf("ошибка старта Grpc :: %v", err)
	}

}
//check
