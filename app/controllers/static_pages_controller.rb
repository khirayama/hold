  class StaticPagesController < ApplicationController

    def home
      locale = cookies[:locale] || I18n.locale
      I18n.locale = locale
      cookies[:locale] = locale
    end

    def app
      render :file => '/public/app'
    end

    def locale
      locale = params[:locale]
      I18n.locale = locale
      cookies[:locale] = locale
      redirect_to '/'
    end
  end
