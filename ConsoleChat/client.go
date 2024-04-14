package main

import (
	"bufio"
	"context"
	"fmt"
	"grpcChatServer/chatserver"
	"log"
	"os"
	"strings"
	"google.golang.org/grpc"
)

func main() {

	fmt.Println("Port::: ")
	reader := bufio.NewReader(os.Stdin)
	serverID, err := reader.ReadString('\n')

	if err != nil {
		log.Printf("Ошибка чтения из консоли :: %v", err)
	}
	serverID = strings.Trim(serverID, "\r\n")

	log.Println("Подключение : " + serverID)

	//Подключение к Grpc серверу
	conn, err := grpc.Dial(serverID, grpc.WithInsecure())

	if err != nil {
		log.Fatalf("Ошибка соедниения :: %v", err)
	}
	defer conn.Close()

	//вызываем поток
	client := chatserver.NewServicesClient(conn)

	stream, err := client.ChatService(context.Background())

	//связь с Grpc сервером

	ch := clienthandle{stream: stream}
	ch.clientConfig()
	go ch.sendMessage()
	go ch.receiveMessage()

	bl := make(chan bool)
	<-bl

}

type clienthandle struct {
	stream     chatserver.Services_ChatServiceClient
	clientName string
}

func (ch *clienthandle) clientConfig() {

	reader := bufio.NewReader(os.Stdin)
	fmt.Printf("твое имя : ")
	name, err := reader.ReadString('\n')
	if err != nil {
		log.Fatalf(" ошибка чтения :: %v", err)
	}
	ch.clientName = strings.Trim(name, "\r\n")

}

//отпрвка сообщений

func (ch *clienthandle) sendMessage() {
	for {

		reader := bufio.NewReader(os.Stdin)
		clientMessage, err := reader.ReadString('\n')
		if err != nil {
			log.Fatalf(" Ошибка чтения с консоли :: %v", err)
		}
		clientMessage = strings.Trim(clientMessage, "\r\n")

		clientMessageBox := &chatserver.FromClient{
			Name: ch.clientName,
			Body: clientMessage,
		}

		err = ch.stream.Send(clientMessageBox)

		if err != nil {
			log.Printf("Ошибка отправки :: %v", err)
		}

	}

}

// получение сообщений
func (ch *clienthandle) receiveMessage() {

	for {
		mssg, err := ch.stream.Recv()
		if err != nil {
			log.Printf("Ошибка отправки сообщений :: %v", err)
		}

		fmt.Printf("%s : %s \n", mssg.Name, mssg.Body)

	}
}
