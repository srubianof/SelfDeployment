package edu.eci.selfdeployment.mypaas;

import com.google.gson.Gson;
import edu.eci.selfdeployment.mypaas.model.Application;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import static spark.Spark.*;

public class App {
    private List<?> apps = new ArrayList<>();

    public static void main(String[] args) {
        PortQueue ports = new PortQueue();
        port(getPort());
        staticFileLocation("/");
        get("/", (req, res) -> {
            res.redirect("/index.html");
            res.status(200);
            return null;
        });
        post("/newApp", (req, res) -> {
            Gson gson = new Gson();
            Application newApp = gson.fromJson(req.body(), Application.class);
            System.out.println(newApp);
            runConfigurations(newApp, ports);
            return newApp;
        });
    }

    private static void runConfigurations(Application app, PortQueue ports) {
        String port = ports.getPorts().poll();
        try {
            app.deployApp(port);
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
    }

    static int getPort() {
        if (System.getenv("PORT") != null) {
            return Integer.parseInt(System.getenv("PORT"));
        }
        return 4567; //returns default port if heroku-port isn't set(i.e on localhost)
    }
}
