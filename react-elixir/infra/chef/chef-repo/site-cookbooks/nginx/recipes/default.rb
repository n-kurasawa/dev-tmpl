#
# Cookbook Name:: nginx
# Recipe:: default
#
# Copyright 2015, YOUR_COMPANY_NAME
#
# All rights reserved - Do Not Redistribute

package "nginx" do
    action :install
end

service "nginx" do
    supports :status => true, :restart => true, :reload => true
    action [:enable, :start]
end

template "default.conf" do
    path "/etc/nginx/sites-available/default"
    source "default.erb"
    owner "root"
    group "root"
    mode 0644
    notifies :reload , "service[nginx]"
end