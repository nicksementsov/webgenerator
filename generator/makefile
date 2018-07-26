CC = g++

CFLAGS = -Wall

TARGET = generator
SOURCE = main.cpp

default: $(TARGET)

$(TARGET): main.o
	$(CC) $(CFLAGS) -o $(TARGET) main.o

main.o: main.cpp
	$(CC) $(CFLAGS) -c main.cpp

clean:
	rm *.o