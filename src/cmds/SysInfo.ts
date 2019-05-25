const si = require('systeminformation');

interface SysInfo {
  osName: string;
  kernalVer: string;
  sysUptime: string; // in days
  ramAvailable?: string; //gb
  ramTotal?: string; // gb
  bootDiskName: string;
  storageCapacity: string;
}

const mergeObjs = (objs: Object[]): Record<string, any> => {
  const nu = {};
  objs.forEach((obj) => {
    const keys = Object.keys(obj);
    console.log(keys);
    keys.forEach((key) => {
      console.log('entry', key, obj[key]);
      nu[key] = obj[key];
    })
  });
  return nu;
}

const bytes2Gb = (bytes) => `${(bytes / 1024 / 1024 / 1024).toPrecision(2)} GB`;
const bytes2Tb = (bytes) => `${(bytes / 1024 / 1024 / 1024 / 1024).toPrecision(2)} TB`;

const calcRam = (rams) => {
  let total = 0;
  rams.forEach((ram) => total += ram.size);
  return bytes2Gb(total);
};

const getInfo = (): Promise<any> => {
  const os = si.osInfo().then((data) => {
    console.log(data);
    return {
      osName: data.distro,
      kernelVer: data.kernel
    };
  });
  // const time = si.time().then((data) => {
  //   return { sysUptime: data.uptime };
  // });
  const disk = si.getStaticData().then((data) => {
    console.log(data);
    return {
      bootDiskName: data.diskLayout[0].name,
      storageCapacity: bytes2Tb(data.diskLayout[0].size),
      ramTotal: calcRam(data.memLayout)
    };
  });
  // @ts-ignore
  return Promise.all([os, disk])
};

const getUptime = () => {
  const seconds = Math.abs(si.time().uptime);
  const days = seconds / 60 / 60 / 24;
  return `${days.toPrecision(2)} days`;
};

const reply = (msg) => {
  return getInfo().then((data) => {
    const info = mergeObjs(data.concat({ sysUptime: getUptime() }));
    console.log(info);
    const embed = {
      color: 3447003,
      title: "System Information",
      description: "System information about the machine on which the bot is running.",
      fields: [{
          name: "Operating system",
          value: `${info.osName}`
        },
        {
          name: "Kernel version",
          value: `${info.kernelVer}`
        },
        {
          name: "Uptime",
          value: info.sysUptime
        },
        {
          name: "RAM",
          value: info.ramTotal
        },
        {
          name: `Storage (${info.bootDiskName})`,
          value: info.storageCapacity
        }
      ],
      timestamp: new Date(),
    };

    msg.channel.send({embed});
  });
};

export default { reply };