#include <stdio.h>
#include <iostream>
#include <fstream>

int main(int argc, char const *argv[])
{
	printf("Hello!\n");
	if (argc > 1)
	{
		std::ofstream genFile;
		genFile.open("genFile.txt");
		genFile << "Wrote to file %NEW%\n";
		genFile.close();
	}

	return 0;
}