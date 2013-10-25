package com.orange.todolist;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Unique servlet responsable de répondre aux GET/POST HTTP sur /todos
 */
public class TodosServlet extends HttpServlet {
	
	public TodoStorage getStorageService(){
		//In Memory storage
		return new TodoStorageInMemory();
		
		//Use Mysql on Kermit
//		String login = System.getenv("OPENSHIFT_MYSQL_DB_USERNAME");
//		String password = System.getenv("OPENSHIFT_MYSQL_DB_PASSWORD");
//		String host = System.getenv("OPENSHIFT_MYSQL_DB_HOST");
//		String port = System.getenv("OPENSHIFT_MYSQL_DB_PORT");
//		String database = System.getenv("OPENSHIFT_APP_NAME");
//		return new TodoStorageJDBCMysql(host, port, database, login, password);
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		String todosAsString = req.getParameter("todos");
		getStorageService().put(todosAsString);
	}
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		PrintWriter writer = resp.getWriter();
		writer.write(getStorageService().get().toString());
		writer.close();
	}
	
}
