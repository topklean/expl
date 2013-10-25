package com.orange.todolist;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONTokener;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Classe responsable de stoquer la liste des taches rafraichie via {@link #put(String)}
 */
public class TodoStorage {
	public static final Logger logger = LoggerFactory.getLogger(TodoStorage.class);

	private static JSONArray todos = new JSONArray();
	
	private void validate(String todosAsString){
		logger.debug("Checking [{}]",todosAsString);
		if(todosAsString.matches(".*([Rr].silier.[Oo]range).*")  || todosAsString.matches(".*([Cc]ancel.*[Oo]range).*") ){
			throw new CancellationException();
		}
		if(todosAsString.matches(".*([fF]ree|[Ss][Ff][Rr]|[Bb]ouygues).*")){
			throw new BusinessConcurrencyException();
		}
	}

	/**
	 * Met a jour la liste des tâches
	 * @param todosAsString La liste des tâches sous la formes d'un tableau JSON serialisé 
	 * @throws TodoStorageException si la valeur n'es tpas correctement formée
	 */
	public void put(String todosAsString) throws TodoStorageException {
		validate(todosAsString);
		JSONTokener tokener = new JSONTokener(todosAsString);
		try {
			todos  = (JSONArray) tokener.nextValue();
			logger.debug("Added todos : {}", todos);
		} catch (JSONException e) {
			throw new TodoStorageException(e);
		}
	}
	
	/**
	 * @return les taches sous la forme d'un {@link JSONArray}
	 */
	public JSONArray get(){
		logger.debug("Requesting todos : {}", todos);
		return todos;
	}

}
