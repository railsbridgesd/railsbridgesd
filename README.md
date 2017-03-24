# Railsbridge San Diego

This is the website for RailsBridge San Diego.

## Getting started

### Clone the app
1. `cd Sites/` (or wherever you like to store projects locally)
2. `git clone git@github.com:railsbridgesd/railsbridgesd.git railsbridgesd`

### Configure the app and bundle install
1. Switch to Ruby 2.4.0 with the Ruby version manager of your choice (this
should happen automatically from the `.ruby-version` file)
2. `bundle install`

### Launch the app
1. Run `bundle exec shotgun config.ru -p 3000`

## Gotchas

- If you can't install the bundle, you might be missing the `bundler` gem.
  `gem install bundler` to install it
