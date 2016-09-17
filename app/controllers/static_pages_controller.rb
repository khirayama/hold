  class StaticPagesController < ApplicationController

    def home
      if logged_in?
        render :file => '/public/app'
      else
        set_locale
      end
    end
  end
