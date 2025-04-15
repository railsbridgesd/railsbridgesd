# RailsBridge San Diego

This is the website for http://www.railsbridgesd.org.


## Getting started

### Clone the app
1. `cd Sites/` (or wherever you like to store projects locally)
2. `git clone git@github.com:railsbridgesd/railsbridgesd.git railsbridgesd`

### Configure the app and bundle install
1. Switch to Ruby 3.4.2 with the Ruby version manager of your choice (this
should happen automatically from the `.ruby-version` file)
2. Create an environment config file: `cp .env.sample .env`
3. Update `.env` variables:
   - CONTACT_EMAIL    - with email address where contact form emails will be sent
   - GMAIL_USERNAME   - with username for Gmail account used to send contact form email
   - GMAIL_PASSWORD   - with password for Gmail account used to send contact form email
   - MAILCHIMP_KEY    - with API key from MailChimp account for RailsBridge San Diego
   - MAILCHIMP_LIST   - with List ID from MailChimp mailing list for RailsBridge San Diego
   - NEXT_RAILSBRIDGE - with date for next RailsBridge San Diego event (2017-04-21)
4. `bundle install`

### Launch the app
1. Run `bundle exec shotgun config.ru -p 3000`


## Contact form
Users can contact RailsBridge San Diego using a contact form in the site footer.

For this to work, you will need to update your `.env` file with values for
`CONTACT_EMAIL`, `GMAIL_USERNAME`, and `GMAIL_PASSWORD`. `CONTACT_EMAIL` should
be set to the email address where contact requests should be sent.
`GMAIL_USERNAME` and `GMAIL_PASSWORD` should be set to the Gmail account that we
wish to use to actually send the contact form emails.

Note: at this time, we only support sending contact form emails via Gmail. But
if you need to send emails with another email service, you could probably tweak
the Pony configuration details in `app.rb`.


## Mailing list
When there is no scheduled date for the next RailsBridge San Diego event, we
will swap out our normal schedule information with a form that people can use to
sign up for our mailing list and get notified when the next RailsBridge has an
official date. This form will appear three days after the start date of the last
event. That way, if the event starts on a Friday, we will show the mailing list
starting the following the Monday.

Once a date for the next RailsBridge San Diego event has been schedule, we
should update the site accordingly. The scheduled date is stored in the
`NEXT_RAILSBRIDGE` variable. The date should be in the following format:
`YYYY-MM-DD`.

In development, just update `NEXT_RAILSBRIDGE` in your `.env` file.

In production, you will need to run the following command:
`heroku config:set NEXT_RAILSBRIDGE=2017-04-21`

To test how mailing list works in development, you can force the mailing list to
show, even if there is a valid future date for the `NEXT_RAILSBRIDGE`, by going
to http://localhost:3000/?list=show.


## Deploy the app

1. If you haven't already, download and install the Heroku CLI.
2. Make sure you've been added as a collaborator to the railsbridgesd Heroku account.
3. `heroku git:remote -a railsbridgesd` to add a git remote for Heroku.
4. Once the remote is added, you can deploy with:
    - `heroku git push master`

### Optional

If the app is already live, you can skip this step. But, if the app is being
deployed for the very first time, you will need to set the following ENV
variables on Heroku.

   ```
   heroku config:set CONTACT_EMAIL=
   heroku config:set GMAIL_USERNAME=
   heroku config:set GMAIL_PASSWORD=
   heroku config:set MAILCHIMP_KEY=
   heroku config:set MAILCHIMP_LIST=
   heroku config:set NEXT_RAILSBRIDGE=
   ```

   To get a quick list of local `.env` variables (which might have some values
   you need), run `cat .env` from your root app directory.


## Gotchas

- If you can't install the bundle, you might be missing the `bundler` gem.
  - Run `gem install bundler` to install it.

- Whenever we schedule a new RailsBridge San Diego, we will need to update all links
on the site that point to the Bridgetroll event page for RailsBridge San Diego
(since each event has its own event page, unfortunately).
