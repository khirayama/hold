  class StaticPagesController < ApplicationController

    def home
      if logged_in?
        render :file => '/public/app'
      else
        set_locale
      end
    end

    def locale
      set_locale

      redirect_to '/'
    end

    private

      def set_locale
        locale = params[:locale] || cookies[:_locale] || I18n.default_locale
        I18n.locale = locale
        cookies[:_locale] = locale
      end
  end
