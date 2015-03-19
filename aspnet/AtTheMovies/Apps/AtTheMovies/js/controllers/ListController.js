﻿(function () {

    var ListController = function (movies, $sce, movieService, alerting, confirmDelete) {

        var model = this;


        model.orderTerm = "-rating";
        model.searchTerm = "";
        model.movies = movies;

        model.saveMovie = function (movie) {
            console.log(movie);
            movieService.save(movie)
                .then(function() {
                alerting.addInfo("Saved " + movie.title);
            });
        };

        model.getTitle = function(movie) {
            return $sce.getTrustedHtml(movie.title);
        };

        model.increaseRating = function(movie) {
            if (movie.rating < 5) {
                movie.rating += 1;
            } else {    
                movie.rating = 1;
            }
        };

        model.delete = function (movie) {

            confirmDelete(movie).then(function() {
                movieService.remove(movie);
                movieService.getAllMovies().then(function(movies) {
                     model.movies = movies;
                });
            });
        }

        model.decreaseRating = function(movie) {
            if (movie.rating > 1) {
                movie.rating -= 1;
            } else {
                movie.rating = 5;
            }
        }

        model.rateMovie = function(movie) {

            return {
                good: movie.rating > 4,
                bad: movie.rating < 2
            };

        };
    };

    var module = angular.module("moviesApp");
    module.controller("ListController", ["movies", "$sce", "movieService", "alerting", "confirmDelete", ListController]);


}());