#include<stdio.h>
#include<sys/socket.h>
#include<arpa/inet.h>	//inet_addr
#include <string.h>
#include <stdlib.h>
#include <unistd.h>

#define DEFAULT_LENGTH 100
#define DEFAULT_PORT 80

int main(int argc , char *argv[])
{
    int length;
    int port;
    int socket_desc;
    struct sockaddr_in server;
    char *message, server_reply[2000];

    //set length
    if (argv[1] == NULL) {
        length = DEFAULT_LENGTH;
    }
    else {
        length = atoi(argv[1]);
    }

    //set port
    if (argv[2] == NULL) {
        port = DEFAULT_PORT;
    }
    else {
        port = atoi(argv[2]);
    }

    printf("Length: %d\nPort: %d\n", length, port);

    //Create socket
    socket_desc = socket(AF_INET , SOCK_STREAM , 0);
    if (socket_desc == -1)
    {
        printf("Could not create socket");
    }

    server.sin_addr.s_addr = inet_addr("73.141.31.82");//ip address
    server.sin_family = AF_INET; //IPv4 domain
    server.sin_port = htons(port); //port 80

    //Bind
    if( bind(socket_desc,(struct sockaddr *)&server , sizeof(server)) < 0)
    {
        puts("bind failed");
    }
    puts("bind done");
    //Listen
    listen(socket_desc , 3);

    //Connect to remote server
    if (connect(socket_desc , (struct sockaddr *)&server , sizeof(server)) < 0)
    {
        puts("connect error");
        return 1;
    }

    puts("Connected\n");

    //Send some data
    message = "GET / HTTP/1.1\r\n\r\n";
    if( send(socket_desc , message , strlen(message) , 0) < 0)
    {
        puts("Send failed");
        return 1;
    }
    puts("Data Send\n");

    //Receive a reply from the server
    if( recv(socket_desc, server_reply , 2000 , 0) < 0)
    {
        puts("recv failed");
    }
    puts("Reply received\n");
    puts(server_reply);

    printf("Length: %d\nPort: %d\n", length, port);
    //close the socket
    close(socket_desc);

    return 0;
}