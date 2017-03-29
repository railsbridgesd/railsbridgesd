
# VIEWS
set :haml, :format => :html5, :attr_wrapper => '"'
set :views, File.dirname(__FILE__) + "/views"

# HELPERS
def image_tag(image, options = {})
  # Get image filename (but remove @1x and @2x resolution suffixes)
  image_name = image.gsub(/@[1-2]x/,'')

  # Set image source
  options[:src] = image

  # Set image srcset (if image filename contains @1x)
  if image.include? "@1x"
    options[:srcset] = "#{image} 1x, #{image.sub("@1x", "@2x")} 2x"
  end

  # Set height and width
  if options[:size]
    options[:width] = options[:size].split("x")[0]
    options[:height] = options[:size].split("x")[1]
    options.delete(:size)
  end

  # Set fallback alt text using image name
  # (only use this if image has no :alt text)
  unless options[:alt]
    options[:alt] = File.basename(image_name,File.extname(image_name))
  end

  # Insert attributes into image tag
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

  # Configure for development environment
  configure :development do

    # Load local ENV variables
    require 'dotenv'
    Dotenv.load

    # Show exceptions
    set :show_exceptions, true

  end

  # Configure for all environments
  configure do

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

    # Configure email settings
    Pony.options = {
      :via => :smtp,
      :via_options => {
        :address              => 'smtp.gmail.com',
        :port                 => '587',
        :enable_starttls_auto => true,
        :user_name            => ENV["GMAIL_USERNAME"],
        :password             => ENV["GMAIL_PASSWORD"],
        :authentication       => :login,
        :domain               => "railsbridgesd.org"
      }
    }

  end

  # ROUTES

  # Homepage
  get '/' do
    @active_workshop = (Time.parse(ENV['NEXT_RAILSBRIDGE']) > (Time.now + 1 * 86400) ? true : false)
    haml :homepage
  end

  # Style guide
  get '/style' do
    haml :style
  end

  # Contact form
  post '/contact' do
    name = params[:name]
    sender_email = params[:inputEmail]
    interest_type = params[:interest]
    message = params[:message]

    Pony.mail(
      to: 'sslampa@gmail.com',
      reply_to: "#{sender_email}",
      subject: "Message from #{name} (#{interest_type})",
      body: "#{message}"
    )
  end

  # Mailing list signup form
  post '/subscribe' do
    
    # Get email and remove whitespace
    email = params[:email].strip

    # Connect to MailChimp
    gibbon = Gibbon::Request.new(api_key: ENV["MAILCHIMP_KEY"])

    # Add email to list
    gibbon.lists(ENV["MAILCHIMP_LIST"]).members.create(body: {email_address: email, status: "subscribed"})

    redirect '/'
  end

end
