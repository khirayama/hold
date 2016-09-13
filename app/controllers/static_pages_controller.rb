  class StaticPagesController < ApplicationController

    def home
    end

    def app
      render :file => '/public/app'
    end
  end
