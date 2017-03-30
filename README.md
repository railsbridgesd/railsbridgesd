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
   - CONTACT_EMAIL    - with email address where contact form emails will be sent
   - GMAIL_USERNAME   - with username for Gmail account that will be used to send contact form email
   - GMAIL_PASSWORD   - with password for Gmail account that will be used to send contact form email
   - MAILCHIMP_KEY    - with API key from MailChimp account for RailsBridge San Diego
   - MAILCHIMP_LIST   - with List ID from MailChimp mailing list for RailsBridge San Diego
   - NEXT_RAILSBRIDGE - with date for next RailsBridge San Diego event (2017-04-21)
4. `bundle install`

### Launch the app
1. Run `bundle exec shotgun config.ru -p 3000`

## Contact form
Users can contact RailsBridge San Diego using a contact form in the site footer.

For this to work, you will need to update your .env file with values for `CONTACT_EMAIL`, `GMAIL_USERNAME`, and `GMAIL_PASSWORD`. `CONTACT_EMAIL` should be set to the email address where contact requests should be sent. `GMAIL_USERNAME` and `GMAIL_PASSWORD` should be set to the Gmail account that we wish to use to actually send the contact form emails.

Note: at this time, we only support sending contact form emails via Gmail. But if you need to send emails with another email service, you could probably tweak the Pony configuration details in `app.rb`.


## Gotchas

- If you can't install the bundle, you might be missing the `bundler` gem.
  - Run `gem install bundler` to install it.
