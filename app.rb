require "digest/md5"
require "haml"
require "pony"
require "rack/ssl-enforcer"
require "sinatra/base"
require "sprockets"
require_relative "helpers"

# APP
class RailsBridgeSanDiego < Sinatra::Base
  use Rack::SslEnforcer, only_environments: 'production'
  helpers Helpers

  # APP SETTINGS

  # Configure for :development environment
  configure :development do

    # Show exceptions
    set :show_exceptions, true
  end

  # Configure for :production environment
  configure :production do
    enable :protection
  end

  # Configure for all environments
  configure do

    # Configure haml
    set :haml, {format: :html5, attr_quote: '"', escape_html: false}

    # Store views in /views
    set :views, Proc.new { File.join(root, "views") }

    # Initialize sprockets
    set :environment, Sprockets::Environment.new

    # Set public folder
    set :static, true

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
        :address              => "smtp.gmail.com",
        :port                 => "587",
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
  get "/" do
    @active_workshop = (Time.now < (Time.parse(ENV["NEXT_RAILSBRIDGE"]) + 1 * 259200) ? true : false)
    haml :homepage
  end

  # Style guide
  get "/style" do
    haml :style
  end

  # Contact form
  post "/contact" do
    name = params[:name]
    email = params[:email]
    interest = params[:interest]
    message = params[:message]

    interest_text = case interest
    when "Student"   then "I'd like to attend RailsBridge"
    when "Volunteer" then "I'd like to help out at RailsBridge"
    when "Teacher"   then "I'd like to teach or TA at RailsBridge"
    when "Organizer" then "I'd like to help plan the next RailsBridge workshop"
    when "Sponsor"   then "I'd like to donate or host the next RailsBridge workshop"
    end

    Pony.mail(
      to: ENV["CONTACT_EMAIL"],
      from: email,
      reply_to: email,
      subject: interest_text,
      body: "#{message}\n\nCheers,\n#{name}"
    )
  end

  # Mailing list signup form
  post "/subscribe" do

    # Get email and remove whitespace
    email = params[:email].strip

    # Connect to MailChimp
    gibbon = Gibbon::Request.new(api_key: ENV["MAILCHIMP_KEY"])

    # Add email to list (and ignore if already subscribed)
    gibbon.lists(ENV["MAILCHIMP_LIST"]).members(Digest::MD5.hexdigest(email)).upsert(body: {email_address: email, status: "subscribed"})
  end

  # Download sponsorship prospectus
  get "/prospectus" do
    send_file File.join(settings.public_folder, 'downloads/RailsBridge_San_Diego_Sponsorship_Prospectus.pdf'), :type => 'application/pdf'
  end

end
