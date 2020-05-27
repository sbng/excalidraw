#
# Makefile
# sbng, 2020-05-27 20:18
#

all:
	./setup-ssl.sh
	 docker build -t excalidraw/excalidraw -f Dockerfile.ssl .

