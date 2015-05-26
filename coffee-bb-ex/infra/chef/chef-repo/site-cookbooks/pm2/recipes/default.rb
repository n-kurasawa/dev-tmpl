#
# Cookbook Name:: pm2
# Recipe:: default
#
# Copyright 2015, YOUR_COMPANY_NAME
#
# All rights reserved - Do Not Redistribute
#

nodejs_npm 'pm2' do
    version "0.12.1"
    action :install
end
