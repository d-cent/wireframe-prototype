/**
 * Module dependencies.
 */

var page = require('page');
var domify = require('domify');
var splash = require('./splash');
var dom = require('dom');
var events = require('events');

page('/', function(ctx, next) {
  var container = document.querySelector('section.site-content');
  var view = new View();

  dom(container).empty().append(view.render());
});

function View() {
  this.el = dom(domify(splash()));
  this.events = events(this.el[0], this);
  this.events.bind('click .activity-title', 'showActivity');
  this.events.bind('click .goback', 'back');
}

View.prototype.render = function() {
  return this.el;
};

View.prototype.showActivity = function() {
  this.el.find('.activitystreams-list').addClass('hide');
  this.el.find('.goback').removeClass('hide');
  this.el.find('.description-container').removeClass('hide');
};

View.prototype.back = function() {
  this.el.find('.activitystreams-list').removeClass('hide');
  this.el.find('.goback').addClass('hide');
  this.el.find('.description-container').addClass('hide');
};