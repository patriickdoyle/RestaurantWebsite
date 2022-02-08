output: tups.o getProc.o
	gcc tups.o getProc.o -o output -Wall -Werror

tups.o: tups.c
	gcc -c tups.c

getProc.o: getProc.c libs.h
	gcc -c getProc.c

clean:
	rm *.o output
