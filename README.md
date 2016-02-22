# frontend-maven-build
An example front end build with Gulp and Maven

## Run the application
To run the application you need
* [Java 8](http://www.oracle.com/technetwork/java/javase/downloads/index.html)
* [Maven](http://maven.apache.org/)

You can run the application with `mvn spring-boot:run` or you can build the JAR file with
`mvn clean package` and run the JAR  with `java -jar target/frontend-maven-build-0.0.1-SNAPSHOT.jar`

What happens next is:
* Maven will resolve all needed dependencies and install node and npm local to the project
* Then it will run `npm install` followed by `bower install` and `gulp` (runs the default task)
* And lastly start the Spring Boot application

To see the application visit [localhost:8080](http://localhost:8080)