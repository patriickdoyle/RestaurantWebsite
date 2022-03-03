//getProc() looks through proc and finds list of processes belonging to the user
#include "libs.h"

void getProc(bool givenPID, bool stateInfo, bool userTime,
             bool sysTime, bool displayVM, bool displayCmd, char *pid) {
    //open the proc directory
    DIR *dirp = opendir("/proc");
    if (dirp == NULL) {
        //check for errors calling library function
        printf("getProc() -> opendir() failed. Error code: %s\n", strerror(errno));
        exit(1);
    }//end if

    struct dirent *nextDir; //nextDir points to next entry in directory stream
    char *procList[100]; //proclist holds all pids to be examined in string form
    int procListSize = 0; //procListSize + 1 = size of array

    if (givenPID == true) { //check if pid is specified
        //if given PID, only want info on that specific proc
        procList[0] = pid;
    }//end if
    //Not given PID: need PIDs of all user procs. They are numerical entries in /proc
    else {
        //while loop gets info for all processes
        printf("\nContents of /proc/: \n");
        while ((nextDir = readdir(dirp)) != NULL) {
            printf(" %s ", nextDir->d_name);
            int len = strlen(nextDir->d_name);//len holds length of current directory name
            bool isChar = false;

            //iterate through all characters in current directory name
            //check for chars, if found move to next entry
            for (int i = 0; i < len; i++) {
                if (isdigit(nextDir->d_name[i]) == false) {
                    isChar = true;
                    break;
                }//end if
            }//end for
            //when ischar == false, entry is a number and therefore a pid
            if (isChar == false) {
                procList[procListSize] = nextDir->d_name;
                procListSize++;
            }//end if

            printf("\n");
        }//end while
    }//end else

    //iterate over procList
    for (int i = 0; i != procListSize; i++) {
        char path[100] = "";
        pid = procList[i];
        char *statFields[100]; //holds all necessary fields of stat file in iterable structure

        //construct path to stat file, path resets each iteration
        strcat(path, "/proc/");
        strcat(path, pid);
        strcat(path, "/stat");

        //read the stat file
        FILE *fsrc = fopen(path, "r");
        if (fsrc == NULL) {
            //fopen returns NULL on error
            printf("getProc(): cannot fopen file\n");
            exit(1);
        }//end if

        //create array to hold stat data
        char entireLine[200] = "";//holds entire field info of stat file
        char c = fgetc(fsrc);
        int i = 0;
        while (c != EOF) {
            entireLine[i] = c;
            c = fgetc(fsrc);
            i++;
        }//end for
        printf("\nContents of /proc/%s/stat: %s\n", pid, entireLine);

        //tokenize entireLine
        char *token = strtok(entireLine, " ");
        i = 0;
        while (token != NULL) {
            statFields[i] = token;
            token = strtok(NULL, " ");
            i++;
        }//end while

        if (stateInfo == true) {
            printf("State info of %s: %s\n", pid, statFields[2]);
        }//end if

        if (userTime == true) { //user wants time consumer by proc
            printf("User time of %s: %s\n", pid, statFields[13]);
        }//end if

        if (sysTime == true) {
            printf("System time of %s: %s\n", pid, statFields[14]);
        }//end if

    }//end for
}//end getProc()

