#!/bin/bash
#whoami
FILE=/home/gitlab-runner/angular_results.txt
if test -f "$FILE"; then
    echo "$FILE exists."
    rm /home/gitlab-runner/angular_results.txt /home/gitlab-runner/output.ps /home/gitlab-runner/angular_results.pdf 
fi
docker login -u dockerscanreport -p dockerscanreport
#snyk auth 040de207-3ba9-4f71-8e40-91e667ceecb8
docker scan --login --token 83f6fe1d-67b6-424b-8950-f9e15162b73e
docker pull ${registry_name}/traefik_dev:latest
docker scan --accept-license ${registry_name}/traefik_dev:latest >/home/gitlab-runner/angular_results.txt
docker rmi ${registry_name}/traefik_dev:latest
#convert txt into pdf
enscript -p /home/gitlab-runner/output.ps /home/gitlab-runner/angular_results.txt
ps2pdf /home/gitlab-runner/output.ps /home/gitlab-runner/angular_results.pdf
#send the mail
#echo "Claims Image Scan Report for `date +"%B %Y"`" | mail -s "Claims Image Scan Report `date` " -A /home/gitlab-runner/claims_results.pdf Phuthuma.Mvovo@mtn.com,rahul.tewari@mtn.com,Tshepiso.Metswamere@mtn.com,Rajasekhar.Mullagura@mtn.com,Thabo.Khomongata@mtn.com,Roscoe.Jampies@mtn.com -aFrom:ITD-Portals@mtn.com
echo "Angular Image Scan Report for `date +"%B %Y"`" | mail -s "Angular Image Scan Report `date` " -A /home/gitlab-runner/angular_results.pdf rahul.tewari@mtn.com -aFrom:ITD-Portals@mtn.com
