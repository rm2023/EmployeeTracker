USE tracker_db;
INSERT into department (name)
VALUES("IT"),
      ("office"),
      ("maintanace");
INSERT INTO role (title, salary,department_id)
VALUES ("programmer", "50000",1),
       ("data", "50000",1),
       ("caller", "40000",2),
       ("reader", "30000",2),
       ("maintanace", "25000",3);

INSERT INTO employee (first_name, last_name,role_id,manager_id)
VALUES ("austin", "martin",5,1),
       ("mercedez", "benz",5,1),
       ("tony", "rich",4,2),
       ("perry", "jones",4,2),
       ("james", "miller",3,2);


