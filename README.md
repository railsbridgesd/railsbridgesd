# RailsBridge San Diego

This is the website for http://www.railsbridgesd.org.

## Getting started

### Clone the app
1. `cd Sites/` (or wherever you like to store projects locally)
2. `git clone git@github.com:railsbridgesd/railsbridgesd.git railsbridgesd`

### Configure the app and bundle install
1. Switch to Ruby 2.4.0 with the Ruby version manager of your choice (this
should happen automatically from the `.ruby-version` file)
2. Create an environment config file: `cp .env.sample .env`
3. Update `.env` variables:   
   - GMAIL_USERNAME   - with your gmail username
   - GMAIL_PASSWORD   - with your gmail password
   - CONTACT_EMAIL    - with contact email address for RailsBridge
   - MAILCHIMP_KEY    - with your MailChimp API key
   - MAILCHIMP_LIST   - with your MailChimp List ID
   - NEXT_RAILSBRIDGE - with your next RailsBridge event date (2017-04-21)
4. `bundle install`

### Launch the app
1. Run `bundle exec shotgun config.ru -p 3000`

## Gotchas

- If you can't install the bundle, you might be missing the `bundler` gem.
  - Run `gem install bundler` to install it.
