export const SQL_BestPerformance = " \
    SELECT movies.movie_name, performance.worldwide_gross \
    FROM moviedb.movies \
    JOIN moviedb.performance ON movies.id = performance.movie_id \
    ORDER BY performance.worldwide_gross DESC \
    LIMIT 10 \
";

export const SQL_HigherROI = " \
    SELECT movies.movie_name, performance.production_budget, performance.worldwide_gross, (performance.worldwide_gross - performance.production_budget) / performance.production_budget AS roi \
    FROM moviedb.movies \
    JOIN moviedb.performance  ON movies.id = performance.movie_id \
    WHERE performance.production_budget > 0 \
    ORDER BY roi DESC \
    LIMIT 10 \
";

export const SQL_DistributionByCountry = " \
    SELECT countries.country, COUNT(*) AS cantidad \
    FROM moviedb.countries \
    JOIN moviedb.productioncountry ON countries.country_id = productioncountry.country_id \
    GROUP BY countries.country \
    ORDER BY cantidad DESC \
";

export const SQL_PopularKeywords = " \
    SELECT keywords.keyword, COUNT(*) AS frecuencia \
    FROM moviedb.keywords \
    JOIN moviedb.moviekeyword ON keywords.keyword_id = moviekeyword.keyword_id \
    GROUP BY keywords.keyword \
    ORDER BY frecuencia DESC \
    LIMIT 10 \
";

export const SQL_PhysicalPerformance = " \
    SELECT movies.movie_name, performance.domestic_dvd, performance.domestic_bluray \
    FROM moviedb.movies \
    JOIN moviedb.performance ON movies.id = performance.movie_id \
    ORDER BY (performance.domestic_dvd + performance.domestic_bluray) DESC \
    LIMIT 10 \
";

export const SQL_AnualProfitability = " \
    SELECT YEAR(m.release_date) AS año, AVG(p.worldwide_gross - p.production_budget) AS avg_profit \
    FROM movies m \
    JOIN performance p ON m.id = p.movie_id \
    WHERE m.release_date IS NOT NULL \
    GROUP BY año \
    ORDER BY año \
";

export const SQL_StdDurationProfit = " \
    SELECT m.movie_name, m.running_time, (p.worldwide_gross - p.production_budget) AS profit \
    FROM movies m \
    JOIN performance p ON m.id = p.movie_id \
    WHERE m.running_time BETWEEN 90 AND 120 \
    ORDER BY profit DESC \
    LIMIT 10 \
";