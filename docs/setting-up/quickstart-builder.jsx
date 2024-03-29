import React, { useState } from 'react';
import styles from './styles.module.css';
// Platform docs
import MacOSPlatform from './../installing-hoop-agent/macos.mdx';
import LinuxPlatform from './../installing-hoop-agent/linux.md';
import DockerPlatform from './../installing-hoop-agent/docker.mdx';
import HerokuPlatform from './../installing-hoop-agent/heroku.md';
import KubernetesPlatform from './../installing-hoop-agent/kubernetes.md';

// use cases docs --> moved to connections
import MySQLCLIUseCase from './../connections/mysql-cli.md';
import NativePostgresUseCase from './../connections/postgres-psql.md';
import PostgresPSQLUseCase from './../connections/postgres-psql.md';
import MongoDBmongoshUseCase from './../connections/mongodb.md';
import KubernetesExecUseCase from './../connections/kubernetes-exec.mdx';
import KubernetesResourcesUseCase from './../connections/kubernetes-resources.md';
import HerokuExecUseCase from './../connections/heroku-oneoff.mdx';
import HerokuInteractiveUseCase from './../connections/heroku-psexec.mdx';
import AWSExecUseCase from './../connections/ecs-exec.md';
import AWSResourcesUseCase from './../connections/aws-resources.md';
import SQLServerCLIUseCase from './../connections/sqlserver.md';
import BastionServerUseCase from './../connections/ssh-bastion.md';
import PortForwardHTTPUseCase from './../connections/http.md';

// connections
import CommandLineConnection from './../connections/native/command-line.mdx';
import PortForwardConnection from './../connections/native/port-forward.mdx';
import PostgresConnection from './../connections/postgres.mdx';

const docOptions = {
  platform: [
    {name: "MacOS", component: () => <MacOSPlatform />},
    {name: 'Linux', component: () => <LinuxPlatform />},
    {name: 'Docker', component: () => <DockerPlatform />},
    {name: 'Heroku', component: () => <HerokuPlatform />},
    {name: 'Kubernetes', component: () => <KubernetesPlatform />},
  ],
  connections: [
    {name: "Postgres", component: () => <PostgresConnection />},
    {name: "Command Line", component: () => <CommandLineConnection />},
    {name: "Port Forward", component: () => <PortForwardConnection />},
  ],
  useCases: [
    {name: 'Native Postgres', component: () => <NativePostgresUseCase />},
    {name: 'Postgres psql CLI', component: () => <PostgresPSQLUseCase />},
    {name: 'MySQL', component: () => <MySQLUseCase />},
    {name: 'MySQL CLI', component: () => <MySQLCLIUseCase />},
    {name: 'MongoDB with mongosh', component: () => <MongoDBmongoshUseCase />},
    {name: 'Kubernetes exec', component: () => <KubernetesExecUseCase />},
    {name: 'Kubernetes resources', component: () => <KubernetesResourcesUseCase />},
    {name: 'Heroku Commands', component: () => <HerokuExecUseCase />},
    {name: 'Heroku Interactive', component: () => <HerokuInteractiveUseCase />},
    {name: 'AWS ECS exec', component: () => <AWSExecUseCase />},
    {name: 'AWS resources', component: () => <AWSResourcesUseCase />},
    {name: 'SQL Server CLI', component: () => <SQLServerCLIUseCase />},
    {name: 'SSH Bastion Server', component: () => <BastionServerUseCase />},
    {name: 'Port Forward HTTP', component: () => <PortForwardHTTPUseCase />},
  ]
}

export default function () {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const platformParam = urlSearchParams.get('platform');
  const connectionParam = urlSearchParams.get('connection');
  const [selectedPlatform, setPlatform] = useState((platformParam || 'MacOS'));
  const [selectedConnection, setConnection] = useState((connectionParam || 'Postgres'));
  const PlatformComponent = docOptions.platform.filter(i => i.name === selectedPlatform)[0].component;
  const ConnectionComponent = docOptions.connections.filter(i => i.name === selectedConnection)[0].component;

  return (
    <div>
      <section className={styles.quickstartBuilderContainer}>
        <div>
          <section>
            <div className={styles.quickstartFormItem}>
              <label
                htmlFor="platform"
              >
                <b>Platform:</b>
              </label>
              <div className={styles.quickstartSelectableList}>
                {docOptions.platform.map(item => (
                  <div
                    className={styles.quickstartSelectableItem}
                    active={(selectedPlatform === item.name) ? 'true' : 'false'}
                    onClick={() => {
                      setPlatform(item.name);
                      urlSearchParams.set('platform', item.name);
                      window.history.replaceState({}, '', `${location.pathname}?${urlSearchParams}`)
                    }}
                    key={item.name}
                  >
                    {item.name}
                  </div>
                ))}
              </div>
            </div>

            <PlatformComponent />

            <div className={styles.quickstartFormItem}>
              <label htmlFor="service"><b>Connection:</b></label>
              <div className={styles.quickstartSelectableList}>
                {docOptions.connections.map(item => (
                  <div
                    className={styles.quickstartSelectableItem}
                    active={(selectedConnection === item.name) ? 'true' : 'false'}
                    onClick={() => {
                      setConnection(item.name);
                      urlSearchParams.set('connection', item.name);
                      window.history.replaceState({}, '', `${location.pathname}?${urlSearchParams}`)
                    }}
                    key={item.name}
                  >
                    {item.name}
                  </div>
                ))}
              </div>

              <div>  
                <a href="/docs/connections">
                <button class="button button--primary button--lg" >More ...</button>  
                </a>
              </div>

            </div>
            <ConnectionComponent />
          </section>
        </div>
      </section>
    </div>
  );
}
