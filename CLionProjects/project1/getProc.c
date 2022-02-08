//getProc() looks through proc and finds list of processes belonging to the user
#include "libs.h"

void getProc(bool givenPID,bool stateInfo,bool userTime,
             bool sysTime,bool displayVM,bool displayCmd,char *pid) {
    //create variable to hold pathname
    char *dirName = "/proc";
    //open the proc directory
    DIR *dirp = opendir(dirName);
    if (dirp == NULL) {
        //check for errors calling library function
        printf("getProc() -> opendir() failed. Error code: %s\n", strerror(errno));
        exit(1);
    }//end if

    //nextDir points to next entry in directory stream
    struct dirent *nextDir;
    //create empty path to concatenate to explore directories
    char path[100] = "";

    if (givenPID == true) { //check if pid is specified
        printf("got to given pid == true \n");
        strcat(path, dirName);
        strcat(path, "/");
        strcat(path, pid);
        dirp = opendir(path);
        while ((nextDir = readdir(dirp)) != NULL) {
            printf("%s\n", nextDir->d_name);

        }
    }//end if
    else {
        strcat(path, dirName);
        //while loop gets info for all processes
    }//end else

    if(stateInfo == true) {
        //construct path to stat file
        printf("test: og path %s\n", path);
        strcat(path, "/stat");
        printf("test: new path %s\n", path);
        printf("set dirp\n");

        //read the stat file
        FILE *fsrc = fopen(path, "r");
        if (fsrc == NULL) {
            //fopen returns NULL on error
            printf("tucp: cannot fopen file\n");
            exit(1);
        }//end if

        //info we need is 3rd state field in stat
        char c = fgetc(fsrc);
        for (int i = 0; i < 10; i++) {
            c = fgetc(fsrc);
            if (i == 8) { //state is the 8th char in stat file
                printf("STATE: %c\n", c);
            }//end if
        }//end for
    }//end if

    if (userTime == true) { //user wants time consumer by proc
        
    }//end if

}//end getProc()

