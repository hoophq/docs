import React, { useState } from 'react';
import styles from './styles.module.css';
// Platform docs
import MacOSPlatform from './../installing-hoop-agent/macos.mdx';
import LinuxPlatform from './../installing-hoop-agent/linux.md';
import WindowsPlatform from './../installing-hoop-agent/windows-native.md';
import HerokuPlatform from './../installing-hoop-agent/heroku.mdx';

// use cases docs
import MySQLUseCase from './../usecases/forwarding-mysql.md';
import MySQLCLIUseCase from './../usecases/mysql.md';
import NativePostgresUseCase from './../usecases/postgres.md';
import PostgresPSQLUseCase from './../usecases/psql.md';
import MongoDBmongoshUseCase from './../usecases/mongodb.md';
import KubernetesExecUseCase from './../usecases/kubernetes-exec.mdx';
import KubernetesResourcesUseCase from './../usecases/kubernetes-resources.md';
import HerokuExecUseCase from './../usecases/heroku-oneoff.mdx';
import HerokuInteractiveUseCase from './../usecases/heroku-psexec.mdx';
import AWSExecUseCase from './../usecases/ecs-exec.md';
import AWSResourcesUseCase from './../usecases/aws-resources.md';
import SQLServerCLIUseCase from './../usecases/sqlserver.md';
import BastionServerUseCase from './../usecases/ssh-bastion.md';
import PortForwardHTTPUseCase from './../usecases/forwarding-http.md';

// connections
import CommandLineConnection from './../connections/command-line.mdx';
import PortForwardConnection from './../connections/port-forward.mdx';
import PostgresConnection from './../connections/postgres.mdx';

const docOptions = {
  platform: [
    {name: "MacOS", component: () => <MacOSPlatform />},
    {name: 'Linux', component: () => <LinuxPlatform />},
    {name: 'Windows', component: () => <WindowsPlatform />},
    {name: 'Heroku', component: () => <HerokuPlatform />},
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
            </div>
            <ConnectionComponent />
          </section>
        </div>
      </section>
    </div>
  );
}
