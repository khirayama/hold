module Api
  module V1
    class SettingsController < Api::V1::ApplicationController
      before_action :authenticate

      def show
        render json: omit_setting(current_user.setting)
      end

      def update
        setting = current_user.setting
        setting.update!(setting_params)
        render json: omit_setting(setting)
      end

      private
        def setting_params
          params.permit(:language, :currency_code)
        end

        def omit_setting(setting)
          {
            language: setting.language,
            currency_code: setting.currency_code,
            languages: I18n.available_locales,
            currency_codes: ['AUD', 'CAD', 'CHF', 'EUR', 'GBP', 'JPY', 'NZD', 'USD']
          }
        end
    end
  end
end
