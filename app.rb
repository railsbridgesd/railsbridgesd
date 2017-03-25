
# VIEWS
set :haml, :format => :html5, :attr_wrapper => '"'
set :views, File.dirname(__FILE__) + "/views"

# HELPERS
def image_tag(image, options = {})
  options[:src] = image
  if image.include? "@1x"
    options[:srcset] = "#{image} 1x, #{image.sub("@1x", "@2x")} 2x"
  end
  options[:alt] = image.gsub(/[.gif|.jpg|.png]/, '')
  options[:width] = options[:size].split("x")[0]
  options[:height] = options[:size].split("x")[1]
  
  attributes = " " + options.map{|k,v| k.to_s + "=" + '"' + v + '" '}.join(" ")
  
  "<img " + attributes + ">"
end

def link_to(text, url, options = {})
  unless options.empty?
    attributes = " " + options.map{|k,v| k.to_s + "=" + '"' + v + '" '}.join(" ")
  else
    attributes = ""
  end
  "<a href=#{url}" + attributes + ">#{text}</a>" 
end

# APP
class RailsBridgeSanDiego < Sinatra::Base
  
  # CONFIG
  
  # Initialize sprockets
  set :environment, Sprockets::Environment.new

  # Set asset paths
  environment.append_path "assets/images"
  environment.append_path "assets/javascripts"
  environment.append_path "assets/stylesheets"

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
  
  # Style guide
  get '/style' do
    haml :style
  end
  
end
