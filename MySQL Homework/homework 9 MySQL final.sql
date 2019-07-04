-- 1a. Display the first and last names of all actors from the table actor
SELECT 
    first_name, last_name
FROM
    actor;

-- 1b. Display the first and last name of each actor in a single column in upper case letters. 
-- Name the column Actor Name.

SELECT 
    CONCAT(first_name, '   ', last_name) AS 'Actor Name'
FROM
    actor;

-- 2a. You need to find the ID number, first name, and last name of an actor, of whom you know only 
-- the first name, "Joe." What is one query would you use to obtain this information?

SELECT 
    actor_id, first_name, last_name
FROM
    actor
WHERE
    first_name = 'Joe';

-- 2b. Find all actors whose last name contain the letters GEN:

SELECT 
    first_name, 
    last_name
FROM
    actor
WHERE
    last_name LIKE '%GEN%';

-- 2c. Find all actors whose last names contain the letters LI. 
	-- This time, order the rows by last name and first name, in that order:
    
SELECT 
   last_name,  first_name
FROM
    actor
WHERE
    last_name LIKE '%LI%'
ORDER BY last_name;
    
-- 2d. Using IN, display the country_id and country columns of the following countries: 
		-- Afghanistan, Bangladesh, and China:
        
SELECT 
    country_id, country
FROM
    country
WHERE
    country IN ('Afghanistan' , 'Bangladesh', 'China');

-- 3a. You want to keep a description of each actor. You don't think you will be performing queries 
-- on a description, so create a column in the table actor named description and use the data type 
-- BLOB (Make sure to research the type BLOB, as the difference between it and VARCHAR are significant).

SELECT 
    *
FROM
    actor;
alter table actor add column description blob;

-- 3b. Very quickly you realize that entering descriptions for each actor is too much effort. 
-- Delete the description column. 

SELECT 
    *
FROM
    actor;
alter table actor drop column description;

-- 4a. List the last names of actors, as well as how many actors have that last name.

SELECT 
    last_name as 'Actors Last Name', COUNT(*) AS 'Name Count' 
FROM
    actor
GROUP BY last_name;

--  4b. List last names of actors and the number of actors who have that last name, 
-- but only for names that are shared by at least two actors

SELECT 
    last_name, COUNT(last_name) AS `name_count`
FROM
    actor
GROUP BY last_name
HAVING `name_count` >= 2;

-- 4c. The actor HARPO WILLIAMS was accidentally entered in the actor table as GROUCHO WILLIAMS. 
-- Write a query to fix the record.

-- first write query to identify PK actor_id, actor-id for GROUCHO WILLIAMS is 172
SELECT * FROM actor WHERE  first_name = 'GROUCHO' and last_name = 'WILLIAMS';

-- update row contains first-name coresponding to actor_id obtained from above query

UPDATE actor 
SET 
    first_name = 'HARPO'
WHERE
    last_name = 'WILLIAMS' and actor_id = 172;

-- 4d. Perhaps we were too hasty in changing GROUCHO to HARPO. 
-- It turns out that GROUCHO was the correct name after all! In a single query,
-- if the first name of the actor is currently HARPO, change it to GROUCHO.

UPDATE actor 
SET 
    first_name = 'GROUCHO'
WHERE
    last_name = 'WILLIAMS' and actor_id = 172;

-- 5a. You cannot locate the schema of the address table. Which query would you use to re-create it?

USE sakila;
CREATE TABLE address (
    address_id INT AUTO_INCREMENT NOT NULL,
    address VARCHAR(50) NOT NULL,
    address2 VARCHAR(50),
    district VARCHAR(20) NOT NULL,
    postal_code VARCHAR(10),
    phone VARCHAR(20),
    last_update TIMESTAMP(12),
    PRIMARY KEY (address_id));

-- 6a. Use JOIN to display the first and last names, as well as the address, of each staff member. 
-- Use the tables staff and address:

SELECT 
    s.first_name, s.last_name, a.address
FROM
    staff s
        JOIN
    address a ON s.address_id = a.address_id;

-- 6b. Use JOIN to display the total amount rung up by each staff member in August of 2005. 
-- Use tables staff and payment.

SELECT 
    s.first_name, s.last_name, SUM(p.amount) AS 'Grand Total'
FROM
    staff s
        JOIN
    payment p ON s.staff_id = p.staff_id
WHERE
    MONTH(p.payment_date) = 08
        AND YEAR(p.payment_date) = 2005
GROUP BY s.staff_id;

-- 6c. List each film and the number of actors who are listed for that film. 
-- Use tables film_actor and film. Use inner join.

SELECT 
    f.title, COUNT(fa.actor_id) as actor_count
FROM
    film f
        INNER JOIN
    film_actor fa ON f.film_id = fa.film_id
    GROUP BY f.title;

-- 6d. How many copies of the film Hunchback Impossible exist in the inventory system?

SELECT 
    f.title AS `Film_Title`,
    COUNT(i.film_id) AS `Inventory_Count`
FROM
    film f
        JOIN
    inventory i ON i.film_id = f.film_id
WHERE
    title = 'Hunchback Impossible';

-- 6e. Using the tables payment and customer and the JOIN command, list the total paid by 
-- each customer. List the customers alphabetically by last name:

SELECT 
    first_name, last_name, SUM(amount) as 'Total Amount Paid'
FROM
    customer c
        JOIN
    payment p ON c.customer_id = p.customer_id
GROUP BY c.customer_id
ORDER BY last_name;

-- 7a. The music of Queen and Kris Kristofferson have seen an unlikely resurgence. 
-- As an unintended consequence, films starting with the letters K and Q have also soared in 
-- popularity. Use subqueries to display the titles of movies starting 
-- with the letters K and Q whose language is English.

SELECT 
    title AS 'Film Title', name AS 'Language'
FROM
    film
        JOIN
    language ON film.language_id = language.language_id
WHERE
    title LIKE 'K%'
        OR title LIKE 'Q%'
        AND film.language_id IN (SELECT 
            film.language_id
        FROM
            language
        WHERE
            name = 'English');

 -- 7b. Use subqueries to display all actors who appear in the film Alone Trip.

SELECT 
    first_name, last_name
FROM
    actor
WHERE
    actor_id IN (SELECT 
            actor_id
        FROM
            film_actor
        WHERE
            film_id IN (SELECT 
                    film_id
                FROM
                    film
                WHERE
                    title = 'Alone Trip'));

-- 7c. You want to run an email marketing campaign in Canada, for which you will need the names 
-- and email addresses of all Canadian customers. Use joins to retrieve this information.

SELECT 
    cu.first_name, cu.last_name, cu.email, co.country
FROM
    customer cu
        JOIN
    country co ON cu.customer_id = co.country_id
WHERE
    country = 'Canada';

-- 7d. Sales have been lagging among young families, and you wish to target all family movies 
-- for a promotion. Identify all movies categorized as family films.

SELECT 
    f.title AS 'Movie Title', c.name AS 'Movie Category'
FROM
    film f
        JOIN
    film_category fc ON f.film_id = fc.film_id
        JOIN
    category c ON fc.category_id = c.category_id
WHERE
    name = 'Family';
  
-- 7e. Display the most frequently rented movies in descending order.

SELECT 
    f.title, COUNT(rental_id) AS Amount
FROM
    film f
        JOIN
    inventory i ON i.film_id = f.film_id
        JOIN
    rental r ON r.inventory_id = i.inventory_id
GROUP BY customer_id
ORDER BY amount DESC;

-- 7f. Write a query to display how much business, in dollars, each store brought in.

SELECT 
    s.store_id, SUM(amount) AS 'Total Revenue in USD'
FROM
    payment p
        JOIN
    rental r ON r.rental_id = p.rental_id
        JOIN
    inventory i ON i.inventory_id = r.inventory_id
        JOIN
    store s ON s.store_id = i.store_id
GROUP BY s.store_id;


-- 7g. Write a query to display for each store its store ID, city, and country.

SELECT 
    s.store_id, c.city, co.country
FROM
    store s
        JOIN
    address a ON a.address_id = s.address_id
        JOIN
    city c ON c.city_id = a.city_id
        JOIN
    country co ON co.country_id = c.country_id;

-- 7h. List the top five genres in gross revenue in descending order. (Hint: you may need to use the 
-- following tables: category, film_category, inventory, payment, and rental.)

SELECT 
    SUM(amount) as 'Gross Revenue', c.name
FROM
    payment p
       JOIN
    rental  r ON r.rental_id = p.rental_id
        JOIN
    inventory  i ON i.inventory_id = r.inventory_id
     JOIN
    film_category  fc ON fc.film_id = i.film_id
        JOIN
    category  c ON c.category_id = fc.category_id
GROUP BY name
ORDER BY SUM(amount) DESC
LIMIT 5;

-- 8a. In your new role as an executive, you would like to have an easy way of viewing the 
-- Top five genres by gross revenue. Use the solution from the problem above to create a view. 
-- If you haven't solved 7h, you can substitute another query to create a view.

CREATE VIEW Top_Five_Genres AS
    SELECT 
        SUM(amount) as 'Gross Revenue', 
		c.name
    FROM
        payment p
            JOIN
        rental r ON r.rental_id = p.rental_id
            JOIN
        inventory i ON i.inventory_id = r.inventory_id
            JOIN
        film_category fc ON fc.film_id = i.film_id
            JOIN
        category c ON c.category_id = fc.category_id
    GROUP BY name
    ORDER BY SUM(amount) DESC
    LIMIT 5;

-- 8b. How would you display the view that you created in 8a?

select * from Top_Five_Genres;

-- 8c. You find that you no longer need the view top_five_genres. Write a query to delete it.

DROP VIEW Top_Five_Genres;
