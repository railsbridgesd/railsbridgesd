# GEMS
require 'rubygems'
require 'sinatra'
require 'haml'
require 'open-uri'
require 'uri'
require './railsbridgesd'
require 'rack-rewrite'

run Sinatra::Application
