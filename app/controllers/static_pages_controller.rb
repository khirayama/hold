  class StaticPagesController < ApplicationController

    def home
      if logged_in?
        render :file => '/public/app'
      end
    end

    def locale
      locale = params[:locale]
      I18n.locale = locale
      cookies[:locale] = locale
      redirect_to '/'
    end
  end
