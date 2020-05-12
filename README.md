Nodejs Home Automation with Lirc for Raspberry pi.
==================================================
Application uses lirc_web and lirc_node for IR interface.  

mongodb(2.4.10) wtih mongoose is used for data store.  

This application runs on Raspberry pi,used as gateway and also Interface for devices connected in a house with rooms/Lawns. 
It provides web UI interface and also  ReST Full Api services, the external site can use the api calls to controle the devices connected in the home premises. 

The rasbberry pi can control the home devices with IR interface, wifi or bluetooth,the end devices/nodes can be connected through microcontrolers(arduino with IR/BLE,ESP32 wifi,sensors,etc) or can directly control any smart enabled end nodes.

*Sample External site* [MyIOT Home](https://iot.ariba.org.in)  
