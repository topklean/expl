CREATE TABLE IF NOT EXISTS todos (tasks VARCHAR(3000));

insert into todos(tasks)
select "[{\"title\":\"Cliquer sur 'Démarrer l'atelier'\",\"completed\":false,\"$$hashKey\":\"005\"},{\"title\":\"Débloquer les bonus\",\"completed\":false,\"$$hashKey\":\"007\"},{\"title\":\"Demander mes accès a Kermit Beta\",\"completed\":false,\"$$hashKey\":\"009\"},{\"title\":\"Déployer mon application\",\"completed\":false,\"$$hashKey\":\"00B\"}]"
FROM DUAL
WHERE NOT EXISTS (SELECT * FROM todos);