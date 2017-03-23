require 'sinatra'

# VIEWS
set :haml, :format => :html5, :attr_wrapper => '"'
set :views, File.dirname(__FILE__) + "/views"

# ROUTES
get '/' do
  haml :index
end
