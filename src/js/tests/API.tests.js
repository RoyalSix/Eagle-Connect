import should from 'should';

export default function () {
    try {
        (5).should.be.exactly(5).and.be.a.Number();
    } catch (e) {
        if (__DEV__) throw Error(e)
    }
}