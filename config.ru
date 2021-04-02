# GEMS
require 'rubygems'
require 'sinatra'
require 'haml'
require 'sassc'
require 'sprockets'
require 'uglifier'
require 'gibbon'
require 'pony'
require './app'

run RailsBridgeSanDiego.new
