export function profiler(name, func) {
    console.profile(name);

    const output = func();

    console.profileEnd(name);

    return output;
}
