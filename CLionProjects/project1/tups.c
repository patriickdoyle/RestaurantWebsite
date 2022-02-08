#include "libs.h"

int main(int argc, char *argv[]) {
    //must have one or more arguments not including prog name
    if (argc < 2) {
        printf("Error: tups must have multiple arguments\n");
        exit(1);
    }//end if

    //boolean values passed to functions to specify user options
    bool givenPID = false;
    bool stateInfo = false;
    bool userTime = true;
    bool sysTime = false;
    bool displayVM = false;
    bool displayCmd = true;

    char *pid = ""; //pid is empty string if not set by user
    //parse command line
    for (int i = 1; i < argc; i++) {
        //all command line arguments will begin with '-'
        if (argv[1][0] != '-') {
            printf("Error. Invalid arguments\n");
            exit(1);
        }//end if

        //-p <pid>: display info for proc w/ given pid
        if (argv[i][1] == 'p') {
            givenPID = true;
            //create string to hold pid
            pid = argv[i + 1];
            printf("Printing info about %s\n", pid);
            i++; //i++ is pid, already handled in this iteration
        }//end if
        //-s: display single character state info about process
        else if (argv[i][1] == 's') {
            stateInfo = true;
            printf("displaying single character state info about process\n");
        }//end else if
        //-U: dont display user time of process
        else if (argv[i][1] == 'U') {
            userTime = false;
            printf("NOT displaying user time of process\n");
        }//end else if
        //-S: display amount of system time consumed by process
        else if (argv[i][1] == 'S') {
            sysTime = true;
            printf("displaying system time consumed by process\n");
        }//end else if
        //-v: display amount of virtual mem used in pages by this program
        else if (argv[i][1] == 'v') {
            displayVM = true;
            printf("displaying virtual mem used in pages by this program\n");
        }//end else if
        //-c: do not display command line that started this program
        else if (argv[i][1] == 'c') {
            displayCmd = false;
            printf("not displaying command line that started this program\n");
        }//end else if
        else {
            printf("invalid argument\n");
            exit(1);
        }//end else

    }//end for
    getProc(givenPID, stateInfo, userTime, sysTime, displayVM, displayCmd, pid);
    return 0;
}
