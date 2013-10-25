package com.orange.todolist;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import org.json.JSONArray;
import org.json.JSONException;


public class TodoStorageJDBC extends TodoStorage {
	
	private String jdbcUrl;
	private String login;
	private String password;

	public TodoStorageJDBC(String jdbcUrl, String login, String password){
		this.jdbcUrl = jdbcUrl;
		this.login = login;
		this.password = password;
	}

	@Override
	public void doPut(JSONArray todos) throws TodoStorageException {
		boolean inserted = false;
		try {
			Connection connect = connect();
			Statement stmt = connect.createStatement();
			stmt.execute("delete from todos where tasks is not null");
			PreparedStatement insert = connect.prepareStatement("insert into todos values (?)");
			insert.setString(1, todos.toString());
			inserted = insert.execute();
			connect.close();
		} catch (SQLException e) {
			throw new TodoStorageException(e);
		}
		if (! inserted){
			throw new TodoStorageException(null);
		}
	}

	@Override
	public JSONArray get() throws TodoStorageException {
		try {
			Connection connect = connect();
			Statement stmt = connect.createStatement();
			ResultSet resultSet = stmt.executeQuery("select * from todos");
			if(resultSet.next()){
				return new JSONArray(resultSet.getString("tasks"));
			}
			connect.close();
		} catch (SQLException e) {
			throw new TodoStorageException(e);
		} catch (JSONException e) {
			throw new TodoStorageException(e);
		}
		return new JSONArray();
	}
	
	private Connection connect() throws TodoStorageException{
		try {
			Class.forName("com.mysql.jdbc.Driver");
			Connection connect = DriverManager.getConnection(jdbcUrl, login, password);
			Statement stmt = connect.createStatement();
			boolean creation =  stmt.execute("CREATE TABLE IF NOT EXISTS todos (tasks VARCHAR(500))");
			logger.debug("Create table result {}", creation);
			return connect;
		} catch (ClassNotFoundException e) {
			throw new TodoStorageException(e);
		} catch (SQLException e) {
			throw new TodoStorageException(e);
		}
	}
}
