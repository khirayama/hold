class ApplicationController < ActionController::Base
  private
    def logged_in?
      !!session[:user_id]
    end

    def update_locale(locale = nil)
      I18n.locale = locale || locale_in_params || cookies[:_locale] || locale_in_accept_language || I18n.default_locale
      cookies[:_locale] = I18n.locale
    end

    def locale_in_params
      if params[:lang].present?
        params[:lang].to_sym.presence_in(I18n::available_locales) || I18n.default_locale
      else
        nil
      end
    end

    def locale_in_accept_language
      request.env['HTTP_ACCEPT_LANGUAGE']
        .to_s
        .split(',')
        .map{ |_| _[0..1].to_sym }
        .select { |_| I18n::available_locales.include?(_) }
        .first
    end
end
