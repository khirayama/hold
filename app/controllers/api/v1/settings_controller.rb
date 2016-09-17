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
          params.permit(:id, :language, :currency_code, :start_date, :start_date_skip_option)
        end

        def omit_setting(setting)
          {
            language: setting.language,
            currency_code: setting.currency_code,
            start_date: setting.start_date,
            start_date_skip_option: setting.start_date_skip_option
          }
        end
    end
  end
end
