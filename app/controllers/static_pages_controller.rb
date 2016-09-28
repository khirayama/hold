  class StaticPagesController < ApplicationController
    before_action :update_locale

    def home
    end

    def application
      if logged_in?
        render :file => '/public/app'
      else
        redirect_to root_path
      end
    end
  end
