//
// Created by Patrick Doyle on 2/1/2022.
//

#ifndef MAIN_C_LIBS_H
#define MAIN_C_LIBS_H

#include <stdio.h>
#include <sys/stat.h>
#include <stdlib.h>
#include <stdbool.h>
#include <errno.h>
#include <string.h>
#include <dirent.h>
#include <ctype.h>

void getProc(bool givenPID,bool stateInfo,bool userTime,
             bool sysTime,bool displayVM,bool displayCmd,char *pid);

#endif //MAIN_C_LIBS_H
