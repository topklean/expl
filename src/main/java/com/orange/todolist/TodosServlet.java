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
	
	public static TodoStorage todoStorage = new TodoStorage();

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		String todosAsString = req.getParameter("todos");
		try {
			todoStorage.put(todosAsString);
		} catch (TodoStorageException e) {
			throw new ServletException(e);
		}
		
	}
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		PrintWriter writer = resp.getWriter();
		writer.write(todoStorage.get().toString());
		writer.close();
	}
	
}
