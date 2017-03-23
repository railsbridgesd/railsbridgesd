require 'sinatra'
require 'sprockets'
require 'uglifier'
require 'sass'

# VIEWS
set :haml, :format => :html5, :attr_wrapper => '"'
set :views, File.dirname(__FILE__) + "/views"

# APP
class RailsBridgeSanDiego < Sinatra::Base
  
  # CONFIG
  
  # Initialize sprockets
  set :environment, Sprockets::Environment.new

  # Set asset paths
  environment.append_path "assets/stylesheets"
  environment.append_path "assets/javascripts"

  # Load assets
  get "/assets/*" do
    env["PATH_INFO"].sub!("/assets", "")
    settings.environment.call(env)
  end
    
  # ROUTES
  
  # Homepage
  get '/' do
    haml :homepage
  end
  
end
